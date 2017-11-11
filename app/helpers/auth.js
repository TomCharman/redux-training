export default function auth () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Tyler McGinnis',
        avatar: '',
        uid: 'tylermcginnis',
      })
    }, 2000)
  })
}
