module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' }, modules: false }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript', // ← добавлено
  ],
};
// modules: false — говорит Babel не преобразовывать import в require, чтобы Jest мог сам с этим справиться.
