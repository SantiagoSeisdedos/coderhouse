// import { ENV } from '../../config/config.js'

let emailService

// @ts-ignore
//if (ENV === 'prod') {
  const { gmailEmailService } = await import('./email.service.gmail.js')
  emailService = gmailEmailService
//} else {
//  const { fakeEmailService } = await import('./email.service.fake.js')
//  emailService = fakeEmailService
//}

export { emailService }
