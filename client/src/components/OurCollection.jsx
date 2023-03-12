import React from 'react';

function OurCollection() {
  const hotelCollection = [
    {
      name: 'SOLO Home',
      description: 'Modern and stylish home stay',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWaJtsXaL7tgfbS4pikSnQxJMdzk_LfqMSIg&usqp=CAU',
    },
    {
      name: 'SOLO Home',
      description: 'Modern and stylish home stay',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWaJtsXaL7tgfbS4pikSnQxJMdzk_LfqMSIg&usqp=CAU',
    },
    {
      name: 'SOLO Home',
      description: 'Modern and stylish home stay',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWaJtsXaL7tgfbS4pikSnQxJMdzk_LfqMSIg&usqp=CAU',
    },
    {
      name: 'SOLO Home',
      description: 'Modern and stylish home stay',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWaJtsXaL7tgfbS4pikSnQxJMdzk_LfqMSIg&usqp=CAU',
    },
    {
      name: 'SOLO Home',
      description: 'Modern and stylish home stay',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWaJtsXaL7tgfbS4pikSnQxJMdzk_LfqMSIg&usqp=CAU',
    },
    {
      name: 'SOLO Home',
      description: 'Modern and stylish home stay',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWaJtsXaL7tgfbS4pikSnQxJMdzk_LfqMSIg&usqp=CAU',
    },
    {
      name: 'SOLO Home',
      description: 'Modern and stylish home stay',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWaJtsXaL7tgfbS4pikSnQxJMdzk_LfqMSIg&usqp=CAU',
    },
    {
      name: 'SOLO Home',
      description: 'Modern and stylish home stay',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWaJtsXaL7tgfbS4pikSnQxJMdzk_LfqMSIg&usqp=CAU',
    },
    {
      name: 'SOLO Home',
      description: 'Modern and stylish home stay',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWaJtsXaL7tgfbS4pikSnQxJMdzk_LfqMSIg&usqp=CAU',
    },
    {
      name: 'SOLO Home',
      description: 'Modern and stylish home stay',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWaJtsXaL7tgfbS4pikSnQxJMdzk_LfqMSIg&usqp=CAU',
    },
  ];
  return (
    <>
      <h1 className="font-bold text-xl my-4">Our collections</h1>
      <section className="flex space-x-3 overflow-y-scroll hideScroll">
        {hotelCollection.map((item) => (
          <main className="text-sm w-36 " key={item.name}>
            <img src={item.img} className="h-32 w-28 rounded-md" alt="" />
            <div className="w-28">
              <h5 className="font-bold">{item.name}</h5>
              <p className="text-xs break-words">{item.description}</p>
            </div>
          </main>
        ))}
      </section>
    </>
  );
}

export default OurCollection;
