const chai = require('chai')
const chaiHttp = require('chai-http')
const server = 'http://localhost:8080'
const should = require('should')
require(`dotenv`).config()

chai.should()
chai.use(chaiHttp)

describe('Invoice Create', () => {
    var data = {

        "sender": {
            "company": "Sample Corp",
            "address": "Sample Street 123",
            "zip": 1234,
            "city": "Sampletown",
            "country": "Samplecountry"
  
        },

        "client": {
            "company": "Client Corp",
            "address": "Clientstreet 456",
            "zip": 4567,
            "city": "Clientcity",
            "country": "Clientcountry",
            "email": "dipikesh.singh.915@gmail.com"
        },
        "information": {
            "newDate": "2021-12-12",
            "due": "2021-12-29"
        },
        "products": [
            {
                "quantity": 2,
                "description": "Product 1",
                "taxRate": 6,
                "price": 33.87
            },
            {
                "quantity": 4.1,
                "description": "Product 2",
                "taxRate": 6,
                "price": 12.34
            },
            {
                "quantity": 4.5678,
                "description": "Product 3",
                "taxRate": 21,
                "price": 6324.453456
            }
        ],
        "note": {
            "notice": "asdfsdf"
        }
    }

    it('Creating Invoices', done => {
        chai
            .request(server)
            .post('/create')
            .send({ data })
            .end((err, res) => {
                res.should.have.status(201)
                done()
            })
    })

    it('Updating Invoices', done => {
        chai
            .request(server)
            .post('/update-invoice-status')
            .send({ number: 239336 })
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
    
    it('Fetching Invoices', done => {
        chai
            .request(server)
            .get('/all')
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
        
        it('Fetching Late Invoices', done => {
            chai
                .request(server)
                .get('/late-invoices')
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
    })
})
