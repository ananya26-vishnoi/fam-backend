function getRndInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}



let data = {
  userData: {
    name: "Demo",
    surname: "Account",
    email: "demo.account@gmail.com",
    mobil: "0987 654 321",
    phone: "0123 456 789",
    address: {
      country: "Slovakia",
      city: "Košice",
      street: "SNP",
      housenumber: "192/58"
    },
    socials: {
      instagram: {
        username: "demo_account",
        link: "#"
      },
      facebook: {
        username: "demo_account",
        link: "#"
      },
      twitter: {
        username: "demo_account",
        link: "#"
      },
      linkedin: {
        username: "demo_account",
        link: "#"
      },
      youtube: {
        username: "demo_account",
        link: "#"
      }
    },
    password: "Password",
    params: {
      user: "demo_account",
      id: "000000000000"
    }
  },
  inbox: [],
  users: [
    {
      name: "Demo",
      surname: "Account",
      email: "demo.account@gmail.com",
      password: "Password",
      params: {
        user: "demo_account",
        id: "000000000000"
      }
    }
  ]
}



let amountOfUsers = getRndInt(5,8)
let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase()

for (let n of "X".repeat(amountOfUsers)) {
  let user = chars[getRndInt(0,chars.length-1)].repeat(getRndInt(3,7)) + "_" + n.repeat(getRndInt(6,11)).toLowerCase()
  let id = getRndInt(100000000000, 999999999999).toString()
  let name = user.split('_')[0]
  let surname = user.split('_')[1]
  let email = user.replace('_', '.') + "@gmail.com"
  data.users.push(
    {
      name: name,
      surname: surname,
      email: email,
      password: "Password",
      params: {
        user: user,
        id: id
      }
    }
  )
}

for (let n of "X".repeat(getRndInt(3,13))) {
  let message = {
    from: data.users[getRndInt(1,amountOfUsers-1)],
    to: data.userData.params,
    at: "DD.MM.YYYY",
    content: ""
  }
  for (let j = 0; j < getRndInt(5,43); j++) {
    for (let i = 0; i < getRndInt(2, 11); i++) {
      message.content += "NOIWaaiigwl"[getRndInt(0,10)]
    }
    message.content += " "
  }
  message.content.trimEnd()
  data.inbox.push(message)
}



export const useDemoData = () => {
  return data
}
