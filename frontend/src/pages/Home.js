import * as React from 'react';
import { Typography, Box, Paper, Grid, Link, Avatar, Chip   } from '@mui/material';
import i18next from '../i18n';
import YoutubeEmbed from "../components/YoutubeEmbed";
import HomeCard from "../components/HomeCard";
import { SlimIcon, FlexIcon } from "../helpers/Icons";
import { AspectRatio, Margin, Lightbulb, Adjust, Terrain, EmojiEvents, Psychology, KeyboardDoubleArrowUp, Celebration, Info as InfoIcon } from "@mui/icons-material";
import theme from '../theme.js';
import Lazy2gisMap from '../components/Lazy2gisMap';

const features = [
  {
    title: i18next.t('Variant'),
    icon: <AspectRatio htmlColor={theme.palette.secondary.light} />,
    content: i18next.t('12x12\' (365x365 cm) original layout')
  },
  {
    title: i18next.t('Holds'),
    icon: <Margin htmlColor={theme.palette.secondary.light} />,
    content: i18next.t('323 hand holds + 153 foot holds')
  },
  {
    title: i18next.t('LEDs'),
    icon: <Lightbulb htmlColor={theme.palette.secondary.light} />,
    content: i18next.t('Highlight your way to the top is an outstanding feature')
  },
  {
    title: i18next.t('Adjustable'),
    icon: <svg height="800" width="800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999"><path d="M495.304 425.739H255.185c-3.583-51.997-23.784-100.693-58.116-140.068L401.37 81.369c6.521-6.516 6.521-17.092 0-23.609-6.521-6.521-17.087-6.521-23.609 0L162.228 273.293 4.891 430.631a16.694 16.694 0 0 0 11.803 28.499H495.303c9.217 0 16.696-7.473 16.696-16.696 0-9.222-7.478-16.695-16.695-16.695z"/></svg>,
    content: i18next.t('You may change wall angle from 0 to 70 degree')
  },
  {
    title: i18next.t('Target audience'),
    icon: <Adjust htmlColor={theme.palette.secondary.light} />,
    content: i18next.t('Entertaining for experienced climbers and beginners as well')
  },
  {
    title: i18next.t('Grades'),
    icon: <Terrain htmlColor={theme.palette.secondary.light} />,
    content: i18next.t('5a-8c / V0-V15')
  }
];

const climbing = [
  {
    title: i18next.t('Olympic'),
    icon: <EmojiEvents htmlColor={theme.palette.primary.light} />,
    content: i18next.t('Rock climbing is an olympic sport since 2020 in Tokyo. Bouldering is one of the three disciplines.')
  },
  {
    title: i18next.t('Stay fit'),
    icon: <SlimIcon />,
    content: i18next.t('Climbing is an exellent activity to stay in shape and burn fat from each part of your body.')
  },
  {
    title: i18next.t('Be stronger'),
    icon: <FlexIcon />,
    content: i18next.t('With regular trainings you will notice how your muscles strength grows.')
  },
  {
    title: i18next.t('Problem solving'),
    icon: <Psychology htmlColor={theme.palette.primary.light} viewBox="0 0 20 20" sx={{transform: 'scale(130%) translateX(-10%) translateY(-12%)'}} />,
    content: i18next.t('Besides physical abilities you also should use your brain when you solve some unusual boulder problems.')
  },
  {
    title: i18next.t('Feel the progress'),
    icon: <KeyboardDoubleArrowUp htmlColor={theme.palette.primary.light} />,
    content: i18next.t('Unlike other sport climbing gives you an apparent progressing experience with it\'s grade system. The stronger and experienced you get the higher grade you may climb.')
  },
  {
    title: i18next.t('Fun'),
    icon: <Celebration htmlColor={theme.palette.primary.light} />,
    content: i18next.t('It\'s much more fun when you appeal to some problem with your friends.')
  }
]

export default function Home() {
  const image = 'kilter.png';
  return (
    <>
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${image})`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: 'none' }} src={image} alt="kilter-board" />}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component="h1"
                variant="h3"
                color="primary.main"
                sx={{backgroundColor: 'rgba(0,0,0,0.4)', display: 'inline-block', px: 1}}
                gutterBottom
              >
                {i18next.t('First Kilterboard  in Kazakhstan!')}
              </Typography>
              <Typography
                variant="h5"
                color="secondary.main"
                sx={{backgroundColor: 'rgba(0,0,0,0.4)', px: 1}}
                paragraph
              >
                {i18next.t('Small climbing gym with primary focus on Kilterboard trainings.')}
              </Typography>
              <Link
                variant="subtitle1"
                color="warning.main"
                sx={{pl: 1}}
                to="/visit"
              >
                {i18next.t('Book my training now')}
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h2" sx={{textAlign: "center", mt: 6, mb: 2, color: 'primary.main', textShadow: `0 0 6px ${theme.palette.primary.main}`}}>
        {i18next.t('Why climbing?')}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        {climbing.map(function(card, i) { return  <HomeCard key={i} color={theme.palette.primary.dark} {...card} /> })}
      </Box>

      <Typography variant="h2" sx={{textAlign: "center", mt: 6, mb: 2, color: 'warning.main', textShadow: `0 0 6px ${theme.palette.warning.main}`}}>
        {i18next.t('What is Kilterboard?')}
      </Typography>

      <Grid container sx={{ justifyContent: 'center' }}>
        <Grid item xs={12} md={10} lg={8}
          sx={{
            p: { xs: 1, md: 4},
            pt: {xs: 1, md: 1}
          }}
        >
          <Paper sx={{p: 4, mb: 4, display: 'flex', alignItems: 'center'}}>
            <Avatar sx={{ bgcolor: 'warning.main', boxShadow: `0px 0px 10px ${theme.palette.warning.main}`, mr: 3 }} aria-label="recipe">
              <InfoIcon htmlColor={theme.palette.primary.light} />
            </Avatar>
            <div>
              <Typography variant="body1" mb={2}>
                The Kilter Board was designed to suit the needs of a users of all abilities so gyms will be able to use the board for their entire customer base.
              </Typography>
              <Typography variant="body1">
                Everyone, regardless of level, can enjoy the intuitive lights to climb, set, and interact with other climbers around the world!
              </Typography>
            </div>
          </Paper>
          <YoutubeEmbed embedId="fVJdY2HNeWo" />
        </Grid>
      </Grid>

      <Typography variant="h2" sx={{textAlign: "center", mt: 6, mb: 2, color: 'secondary.main', textShadow: `0 0 6px ${theme.palette.secondary.main}`}}>
        {i18next.t('Our setup')}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        {features.map(function(card, i) { return  <HomeCard key={i} color={theme.palette.secondary.dark} {...card} /> })}
      </Box>

      <Typography variant="h2" sx={{textAlign: "center", mt: 6, mb: 2, color: 'success.main', textShadow: `0 0 6px ${theme.palette.success.main}`}}>
        {i18next.t('Map / Contacts')}
      </Typography>

      <Grid container sx={{justifyContent: 'center'}}>
        <Grid item md={3} sx={{textAlign: 'center'}}>
          <Typography variant="h6">
            {i18next.t('Our address')}
          </Typography>
          <Typography>
            {i18next.t('Test street, 123, 1th floor, office 2')}
          </Typography>
          <Typography variant="h6" sx={{mt: 4}}>
            {i18next.t('Contact phone')}
          </Typography>
          <Chip
            label="+7 (707) 1234567"
            component="a"
            href="tel:+77071234567"
            variant="outlined"
            clickable />
        </Grid>
        <Grid item md={6} sx={{ display: 'block' }}>
          <Lazy2gisMap
            sx={{ height: 400, display: 'block' }}
            center={[43.238214, 76.94546]}
            zoom={16}
            balloon_text={i18next.t('Kilter club Almaty is here')}
          />
        </Grid>
      </Grid>
    </>
  );
}