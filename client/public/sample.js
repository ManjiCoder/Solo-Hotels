const a = {
  hotelF: [
    'Food &amp; Beverage:Bar',
    'Restaurant',
    'Coffee Shop',
    'Lounge',
    'Pool Snack Bar',
    'Patisserie Shop',
    'Barbeque',
    'Business Services:Business Center',
    'Audio Visual Equipment',
    'LCD / Projector',
    'Meeting Facility',
    'Board Room',
    'Conference Hall',
    'Meeting Room',
    'Printer',
    'Fax',
    'Photocopy',
    'Scanner',
    'Basics:Internet',
    'Air Conditioning',
    'Lift',
    'Facility for Disabled Guest',
    'Non-Smoking Rooms',
    'Adjoining Rooms',
    'Interconnecting Rooms',
    'Doorman',
    'Express Check-In',
    'Express Check-Out',
    'Female Traveler Room',
    'Housekeeping',
    'Complimentary Wi-Fi access',
    'Banquet Facility',
    'Doctor on Call',
    '24 Hour Power Supply',
    'No Category:Shopping',
    'Conference facilities',
    'Business services',
    'Bay View',
    'Body Treatments',
    'Cocktail Lounge',
    'Free Newspaper',
    'Front Desk',
    'Guest Laundromat',
    'Hairdryers',
    'In Room Movies',
    'Outdoor Pool',
    'Outlet Adapters',
    'Phone Service',
    'Wedding Service',
    'Recreation:Kids Pool',
    'Gym',
    'Nightclub',
    'Spa',
    'Health Club',
    'Jacuzzi',
    'Live Entertainment',
    'Massage Centre',
    'Outdoor Swimming Pool',
    'Sauna',
    'Shopping Arcade',
    'Steam Bath',
    'Activity Centre',
    'Garden',
    'Bonfire Arrangement',
    'Outdoor Games',
    'Travel:Bus Parking',
    'Parking',
    'Valet Parking',
    'Porter',
    'Outdoor Parking',
    'Free Parking',
    'Travel Desk',
    'Airport Transfer',
    'Transportation Service',
    'Car Rental',
    'Railway Station Transfer',
    'Taxi Service',
    'Personal Services:24 Hour Front Desk',
    '24 Hour Room Service',
    'Babysitting',
    'Laundry',
    'Room Service',
    'Dry Cleaning',
    'Hotel Amenities:24-Hour Security',
    'Catering Service',
    'Concierge',
    'Courtyard',
    'Executive Level / Floor',
    'Gift Shop',
    'Basic Room Amenities:Video Game Player',
    'Wake-Up Call Service',
  ],
  roomF: [
    'Bedside Controls', // MdBed
    ' CD / DVD Player', // RiDvdFill
    ' Express Laundry Service', // GiClothes // MdLocalLaundryService
    ' Flat Screen Television',
    ' Mirror', // GiMirrorMirror
    ' Hangers', // GiHanger // TbHanger
    ' Jacuzzi', // FaBath
    ' In-Room Menu', // MdMenuBook
    ' In-Room Electronic Safe', // AiFillSafetyCertificate // AiFillThunderbolt
    ' Laundry Bag', // BsFillBagFill
    ' Marble Floor',
    ' Parallel Phone Line in Bathroom', // BsPhoneFill
    ' Rollaway Bed', // IoBed
    ' Satellite Television', //
    ' Guest Slippers', // GiSlippers
    ' Table Lamp', // BsFillLampFill
    ' Tea / Coffee maker', // MdCoffeeMaker
    ' Temperature Control', // AiFillControl
    ' Turn Down Service',
    ' Windows Open',
    ' Free Wi-Fi', // MdWifi
    ' International Plug Point',
    ' Hair Dryer',
    ' Newspaper',
    ' Refrigerator',
    ' Bathtub',
    ' Bathrobe',
    ' Bedside Lamp',
    ' Ceiling Fan',
    ' Snack Basket',
    ' Mineral Water',
    ' Toiletries ',
    ' Intercom ',
    ' Disabled Features Room Heater Phone Line Wi-Fi Access on Charge Air Conditioning Television Internet / Broadband Mini Bar Safe ',
    ' Telephone ',
    ' Luggage Rack Sofa Writing Desk / Study Table Private Bathroom ',
    ' Balcony / Sit Out Area',
  ],
};
/** *
 * HotelModel.find({}, { room_facilities: 1 })
      .then((v) => v)
      .then((v) => {
        const a = v.map((o) => o.room_facilities);
        const b = a.map((s) => {
          if (s) {
            const c = s.split('|').length;
            if (c === 37) {
              res.json(s.split('|'));
              return c;
            }
          }
        }).sort((a1, b1) => b1 - a1);
        res.json(b);
      });
 */
