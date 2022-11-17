module.exports = function (ctx) {
  return {
    supportTS: true,
    extras: [
      'material-icons',
      'mdi-v6',
      'ionicons-v4', // 最后一个webfont在v4.6.3中可用。
      'eva-icons',
      'fontawesome-v6',
      'themify',
      'line-awesome',
      'bootstrap-icons'
    ]
  }
}