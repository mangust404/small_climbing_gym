import React from 'react';
import { Container, Link, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import i18next from '../i18n';

export default function Footer(props) {
  function handleLangChange(e) {
    props.setLang((prevLang) => {
      return e.target.value;
    });
  }

  return (
    <>
      <Container sx={{py: 4, justifyContent: 'center', alignItems: 'baseline', display: 'flex'}}>
        <Link
          variant="button"
          color="success.main"
          to="/visit"
          sx={{ my: 1, mx: 1.5 }}
        >
          {i18next.t('footer.visit')}
        </Link>
        <Link
          variant="button"
          color="success.main"
          to="/terms"
          sx={{ my: 1, mx: 1.5 }}
        >
          {i18next.t('footer.terms')}
        </Link>
        <Link
          variant="button"
          color="success.main"
          to="/faq"
          sx={{ my: 1, mx: 1.5 }}
        >
          {i18next.t('footer.faq')}
        </Link>

        <Typography sx={{ml: 4}}>© Kilter club Almaty {(new Date()).getFullYear()}</Typography>

        <FormControl sx={{ ml: 2 }} size="small">
          <InputLabel id="lang-select-label"></InputLabel>
          <Select
            labelId="lang-select-label"
            id="lang-select"
            value={props.lang}
            onChange={handleLangChange}
            sx={{
              py: 0
            }}
          >
            <MenuItem value="en">🇺🇸</MenuItem>
            <MenuItem value="ru-RU">🇷🇺</MenuItem>
            <MenuItem value="kk-KZ">🇰🇿</MenuItem>
          </Select>
        </FormControl>

      </Container>
    </>
  );
}