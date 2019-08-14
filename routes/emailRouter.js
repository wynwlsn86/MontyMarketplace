const express = require('express')
const emailRouter = express.Router()
const nodemailer = require('nodemailer')
const moment = require('moment')
emailRouter.post('/', async (req, res) => {
	try {
		let adminTransporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			auth: {
				user: process.env.ADMIN_EMAIL,
				pass: process.env.MAILER_PASS
			}
		})

		let adminEmail = await adminTransporter.sendMail({
			from: req.body.userEmail,
			to: '',
			cc: '',
			subject: `${req.body.name} purchased ${req.body.item}`,
			text: `${req.body.name} purchased ${req.body.item} on ${moment().format(
				'MMMM Do YYYY, h:mm:ss a'
			)}. Their contact information is ${req.body.userEmail}, name is ${
				req.body.name
			}, phone number is ${req.body.phoneNumber}.`
		})

		let userEmail = await adminTransporter.sendMail({
			from: req.body.userEmail,
			to: '',
			cc: '',
			subject: `Your order from MontysMarket of ${req.body.item}`,
			html: `<!doctype html>
      <html 4email>
      <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat&display=swap"
        rel="stylesheet"
      />
      </head>
        <body style="	font-family: 'Montserrat', sans-serif; background: #085078; background: -webkit-linear-gradient(to right,#85d8ce,#085078); background: linear-gradient(to right,#85d8ce,#085078); color:#f8f8f8; text-align:center">
          <div class="heading" style="display: flex;flex-direction: row;margin-left:30% margin-bottom: 20px;">
            <img src="https://montymarketplace.s3.amazonaws.com/montyIGlogo.png" style="height: 80px;margin-top: -20px;margin-right: 2em;"/>
            <h1>Thank You ${req.body.name} For Your Order!</h1>
          </div>
          <div class="main" style="	text-align: center; background: #2d7690; border-radius: 4px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2); border: 2px solid #fecf0a; width: 50%; margin: 80px auto 20px auto; padding: 20px; margin: auto; width: 60%; font-size: 18px; color: #f8f8f8;">
            <p>Your order for ${req.body.item} is being reviewed!</p>
            <p>Our deliverer will contact you soon!</p>
            <div class="closing" style="margin-top: 20px;">
              <p>Sincerely,</p>
              <p>MontysMarket</p>
            </div>
          </div>
          <footer style="	border-top: 2px solid #fecf0a; background: #2d7690; text-align: center; padding: 20px 0; width: 100%; position: absolute; bottom: 0; margin: 20px 0 0 0; left: 0; height: 40px">
            <p>COPYRIGHT © 2019 MONTY MARKET - ALL RIGHTS RESERVED.</p>
          </footer>
        </body>
      </html>`
		})
		res.send([userEmail, adminEmail])
	} catch (error) {
		throw error
	}
})

module.exports = emailRouter
