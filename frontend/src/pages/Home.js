import * as React from 'react';
import { Typography, Box, Paper, Grid, Link, Avatar, Chip   } from '@mui/material';
import i18next from '../i18n';
import YoutubeEmbed from '../components/YoutubeEmbed';
import HomeCard from '../components/HomeCard';
import { SlimIcon, FlexIcon } from '../helpers/Icons';
import { AspectRatio, Margin, Lightbulb, Adjust, Terrain, EmojiEvents, Psychology, KeyboardDoubleArrowUp, Celebration, Info as InfoIcon } from '@mui/icons-material';
import theme from '../theme.js';
import Lazy2gisMap from '../components/Lazy2gisMap';

const features = [
  {
    title: i18next.t('home.variant'),
    icon: <AspectRatio htmlColor={theme.palette.secondary.light} />,
    content: i18next.t('home.variant_content')
  },
  {
    title: i18next.t('home.holds'),
    icon: <Margin htmlColor={theme.palette.secondary.light} />,
    content: i18next.t('home.holds_content')
  },
  {
    title: i18next.t('home.leds'),
    icon: <Lightbulb htmlColor={theme.palette.secondary.light} />,
    content: i18next.t('home.leds_content')
  },
  {
    title: i18next.t('home.adjustable'),
    icon: <svg height="800" width="800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999"><path d="M495.304 425.739H255.185c-3.583-51.997-23.784-100.693-58.116-140.068L401.37 81.369c6.521-6.516 6.521-17.092 0-23.609-6.521-6.521-17.087-6.521-23.609 0L162.228 273.293 4.891 430.631a16.694 16.694 0 0 0 11.803 28.499H495.303c9.217 0 16.696-7.473 16.696-16.696 0-9.222-7.478-16.695-16.695-16.695z"/></svg>,
    content: i18next.t('home.adjustable_content')
  },
  {
    title: i18next.t('home.target_audience'),
    icon: <Adjust htmlColor={theme.palette.secondary.light} />,
    content: i18next.t('home.target_audience_content')
  },
  {
    title: i18next.t('home.grades'),
    icon: <Terrain htmlColor={theme.palette.secondary.light} />,
    content: i18next.t('home.grades_content')
  }
];

const climbing = [
  {
    title: i18next.t('home.olympic'),
    icon: <EmojiEvents htmlColor={theme.palette.primary.light} />,
    content: i18next.t('home.olympic_content')
  },
  {
    title: i18next.t('home.stay_fit'),
    icon: <SlimIcon />,
    content: i18next.t('home.stay_fit_content')
  },
  {
    title: i18next.t('home.be_stronger'),
    icon: <FlexIcon />,
    content: i18next.t('home.be_stronger_content')
  },
  {
    title: i18next.t('home.problem_solving'),
    icon: <Psychology htmlColor={theme.palette.primary.light} viewBox="0 0 20 20" sx={{transform: 'scale(130%) translateX(-10%) translateY(-12%)'}} />,
    content: i18next.t('home.problem_solving_content')
  },
  {
    title: i18next.t('home.feel_the_progress'),
    icon: <KeyboardDoubleArrowUp htmlColor={theme.palette.primary.light} />,
    content: i18next.t('home.feel_the_progress_content')
  },
  {
    title: i18next.t('home.fun'),
    icon: <Celebration htmlColor={theme.palette.primary.light} />,
    content: i18next.t('home.fun_content')
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
                {i18next.t('home.header1')}
              </Typography>
              <Typography
                variant="h5"
                color="secondary.main"
                sx={{backgroundColor: 'rgba(0,0,0,0.4)', px: 1}}
                paragraph
              >
                {i18next.t('home.subheader')}
              </Typography>
              <Link
                variant="subtitle1"
                color="warning.main"
                sx={{pl: 1}}
                to="/visit"
              >
                {i18next.t('home.book_now_link')}
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Typography variant="h2" sx={{textAlign: 'center', mt: 6, mb: 2, color: 'primary.main', textShadow: `0 0 6px ${theme.palette.primary.main}`}}>
        {i18next.t('home.why_climbing_header')}
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

      <Typography variant="h2" sx={{textAlign: 'center', mt: 6, mb: 2, color: 'warning.main', textShadow: `0 0 6px ${theme.palette.warning.main}`}}>
        {i18next.t('home.what_is_kilter_header')}
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

      <Typography variant="h2" sx={{textAlign: 'center', mt: 6, mb: 2, color: 'secondary.main', textShadow: `0 0 6px ${theme.palette.secondary.main}`}}>
        {i18next.t('home.our_setup_header')}
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

      <Typography variant="h2" sx={{textAlign: 'center', mt: 6, mb: 2, color: 'success.main', textShadow: `0 0 6px ${theme.palette.success.main}`}}>
        {i18next.t('home.map_contacts_header')}
      </Typography>

      <Grid container sx={{justifyContent: 'center'}}>
        <Grid item md={3} sx={{textAlign: 'center'}}>
          <Typography variant="h6">
            {i18next.t('home.our_address')}
          </Typography>
          <Typography>
            {i18next.t('home.address_line')}
          </Typography>
          <Typography variant="h6" sx={{mt: 4}}>
            {i18next.t('home.contact_phone')}
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
            balloon_text={i18next.t('home.point_title')}
          />
        </Grid>
      </Grid>
    </>
  );
}