const { MongoClient } = require('mongodb');
const hbs = require('nodemailer-express-handlebars');
const path = require('node:path');
const express = require('express');

module.exports = async function passwordReset(req, res) {
  const query = req.body;

  const mongoUrl = req.headers.node_env == 'test'? process.env.MONGODB_URI_TEST: process.env.MONGODB_URI;
  
  const mongoClient = await MongoClient.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const database = mongoClient.db();
  if (database) {
    const users = database.collection('users');
  	const result = await users.findOne({email: query.email});

    if (result && result.verified) {
      const confirmation_code = parseInt(10000+Math.random()*89999);

      users.updateOne({_id: result._id}, { $set: {confirmation_code}});

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
        subject: `Password reset on ${process.env.SITENAME}`,
        template: 'confirmation_code',
        context: {
          ...result,
          confirmation_code
        }
      });

      res.json({success: info && info.accepted.length > 0});
      return;
    }
  }
  res.json({success: false, 'error': 'Probably email you entered is not valid'});
}