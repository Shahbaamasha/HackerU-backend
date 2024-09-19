const User = require('./models/User'); 
const Card = require('./models/Card');

const seedData = async () => {
  try {
    await User.deleteMany({});
    await Card.deleteMany({});
    const users = [
      {
        name: {"first":"John Doe1","last":"test"},
        email: "admin2@example.com",
        password: "password",
        isAdmin: true,
        isBusiness: false,
        phone: "333",
        address: {
          state:"test trest",
          country: "check",
          city: "ds",
          street: "ssss",
          houseNumber: "5"
        },
        image: {
          url:"ssss",
          alt: "zxc"
        }
      },
      {
        name: {"first":"John Doe1","last":"test"},
        email: "business@example2.com",
        password: "password",
        isAdmin: false,
        isBusiness: true,
        phone: "333",
        address: {
          state:"test trest",
          country: "check",
          city: "ds",
          street: "ssss",
          houseNumber: "5"
        },
        image: {
          url:"ssss",
          alt: "zxc"
        }
      },
      {
        name: {"first":"John Doe1","last":"test"},
        email: "regular222@example.com",
        password: "password",
        isAdmin: false,
        isBusiness: false,
        phone: "333",
        address: {
          state:"test trest",
          country: "check",
          city: "ds",
          street: "ssss",
          houseNumber: "5"
        },
        image: {
          url:"ssss",
          alt: "zxc"
        }
      },
    ];

    const cards = [
      {
        title: "Business Card 1",
        subtitle: "Subtitle 1",
        description: "Description for card 1",
        phone: "+1234567890",
        email: "contact1@example.com",
        web: "http://example12.com",
        image: {
          url: "http://example.com/image1.jpg",
          alt: "Image 1",
        },
        address: {
          state: "State 1",
          country: "Country 1",
          city: "City 1",
          street: "Street 1",
          houseNumber: "123",
        },
        user_id: "66e2b0dfbebe002ea1d0892f",
        bizNumber:"1234656"
      },
      {
        title: "Business Card 2",
        subtitle: "Subtitle 2",
        description: "Description for card 2",
        phone: "+1234567891",
        email: "contact2@example.com",
        web: "http://example24.com",
        image: {
          url: "http://example.com/image2.jpg",
          alt: "Image 2",
        },
        address: {
          state: "State 2",
          country: "Country 2",
          city: "City 2",
          street: "Street 2",
          houseNumber: "456",
        },
        user_id: "66e2b0dfbebe002ea1d0892f",
        bizNumber:"1234657"
      },
      {
        title: "Business Card 3",
        subtitle: "Subtitle 3",
        description: "Description for card 3",
        phone: "+1234567892",
        email: "contact32@example.com",
        web: "http://example3.com",
        image: {
          url: "http://example.com/image3.jpg",
          alt: "Image 3",
        },
        address: {
          state: "State 3",
          country: "Country 3",
          city: "City 3",
          street: "Street 3",
          houseNumber: "789",
        },
        user_id: "66e2b0dfbebe002ea1d0892f",
        bizNumber:"12346568"
      },
    ];

    await User.insertMany(users);
    await Card.insertMany(cards);

    console.log("Sample data has been successfully seeded");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

module.exports = seedData;