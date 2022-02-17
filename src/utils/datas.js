exports.data = {

    sender: {
      company: 'Sample Corp',
      address: 'Sample Street 123',
      zip: '1234 AB',
      city: 'Sampletown',
      country: 'Samplecountry'
  
    },
 
    "client": {
      company: 'Client Corp',
      address: 'Clientstreet 456',
      zip: '4567 CD',
      city: 'Clientcity',
      country: 'Clientcountry'
  
    },
  information: {
    // Invoice number
    number: '2021.0001',
    // Invoice data
    date: '12-12-2021',
    // Invoice due date
    'due-date': '31-12-2021'
  },
  // The products you would like to see on your invoice
  // Total values are being calculated automatically
  products: [
    {
      quantity: 2,
      description: 'Product 1',
      'tax-rate': 6,
      price: 33.87
    },
    {
      quantity: 4.1,
      description: 'Product 2',
      'tax-rate': 6,
      price: 12.34
    },
    {
      quantity: 4.5678,
      description: 'Product 3',
      'tax-rate': 21,
      price: 6324.453456
    }
  ],
  // The message you would like to display on the bottom of your invoice
  'bottom-notice': 'Kindly pay your invoice within 15 days.',
  // Settings to customize your invoice
  settings: {
    currency: 'USD'
  }
  // Translate your invoice to your preferred language
}
