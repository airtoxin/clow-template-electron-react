module.exports = [
  {
    type: "template",
    src: {
      cwd: "templates",
      pattern: "**/*"
    },
    dest: ".",
    args: {
      name: null,
      description: null,
      year: (new Date()).getFullYear()
    }
  },
  {
    type: "npm-install",
    dependencies: [
      "babel-runtime",
      "baobab",
      "baobab-react",
      "react",
      "react-dom",
      "lodash"
    ],
    devDependencies: [
      "babel-cli",
      "babel-eslint",
      "babel-plugin-transform-runtime",
      "babel-preset-es2015",
      "babel-preset-es2016",
      "babel-preset-es2017",
      "babel-preset-react",
      "babel-preset-stage-2",
      "babel-preset-stage-3",
      "babel-register",
      "devtron",
      "electron",
      "electron-packager",
      "eslint",
      "eslint-plugin-babel",
      "eslint-plugin-async-await",
      "mocha",
      "rimraf"
    ]
  },
  {
    // install eslint preset
    type: "shell",
    commands: [
      "npm info 'eslint-config-airbnb@latest' peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --DE 'eslint-config-airbnb@latest'"
    ]
  },
  {
    type: "shell",
    commands: [
      "git init",
      "git add .",
      "git commit -m 'Initialized by clow-template-electron-react.'"
    ]
  }
];
