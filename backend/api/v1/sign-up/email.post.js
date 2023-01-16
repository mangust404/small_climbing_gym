const { MongoClient } = require('mongodb');
const hbs = require('nodemailer-express-handlebars');
const path = require('node:path');
const express = require('express');

module.exports = async function signUpEmail(req, res) {
  const result = req.body;
  const confirmation_code = parseInt(10000+Math.random()*89999);

  const client = new MongoClient(req.headers.node_env == 'test'? process.env.MONGODB_URI_TEST: process.env.MONGODB_URI);
  try {

    if (!result.email) throw 'Email is not valid';


    const database = client.db(req.headers.node_env == 'test'? process.env.MONGODB_DB_TEST: process.env.MONGODB_DB);
    const users = database.collection('users')

    const exists = await users.findOne({ email: result.email });
    
    if (exists) {
      if (exists.verified) {
        throw 'User with such email already exists. Please recover your password.';
      }
      else {

        await users.updateOne({_id: exists._id}, { $set: {confirmation_code}});

        result.id = exists._id;
      }
    }
    else {
      const insertResult = await users.insertOne({
        email: result.email,
        confirmation_code: confirmation_code
      })

      result.id = insertResult.insertedId;
    }

    const nodemailer = require(req.headers.node_env == 'test'? 'nodemailer-mock': 'nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_SMTP_HOST,
      port: process.env.MAIL_SMTP_PORT,
      auth: {
        user: process.env.MAIL_SMTP_USER,
        pass: process.env.MAIL_SMTP_PASS
      }
    });

    transporter.use()

    const lang = result.lang.split('-')[0];

    const viewPath =  path.resolve(__dirname, '../../../templates/' + lang + '/views/');
    const layoutsPath =  path.resolve(__dirname, '../../../templates/layouts/');
    const partialsPath = path.resolve(__dirname, '../../../templates/' + lang + '/partials');

    transporter.use('compile', hbs({
      viewEngine: {
        extName: '.handlebars',
        layoutsDir: layoutsPath,
        defaultLayout: 'default',
        partialsDir: {
          dir: partialsPath
        },
        express
      },
      viewPath: viewPath,
      extName: '.handlebars'
    }));

    const info = await transporter.sendMail({
      from: process.env.MAIL_SMTP_FROM,
      to: result.email,
      subject: `Create new account on ${process.env.SITENAME}`,
      template: 'confirmation_code',
      context: {
        ...result,
        confirmation_code
      }
    });
    result.mail_sent = info && info.accepted.length > 0;
  }
  catch(e) {
    res.json({
      success: false,
      error: e.toString(),
      data: result
    });
    return;
  }
  finally {
    client.close()
  }
  
  res.json({
    success: true,
    data: result
  });
}