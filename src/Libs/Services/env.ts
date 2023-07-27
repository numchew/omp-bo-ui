var envSources = process.env;
if ((window as any)._env != null) {
  envSources = (window as any)._env;
}

const {
  PORT,
  REACT_APP_BASE_NAME,
  REACT_APP_TITLE,
  REACT_APP_REDIRECT_URL,

  REACT_APP_API_HOST,

  APP_API_SECRET,
} = envSources;

export default {
  PORT: PORT,
  APP_BASE_NAME: REACT_APP_BASE_NAME,
  APP_TITLE: REACT_APP_TITLE,
  APP_REDIRECT_URL: REACT_APP_REDIRECT_URL,

  APP_API_HOST: REACT_APP_API_HOST,

  APP_API_SECRET: APP_API_SECRET,
};
