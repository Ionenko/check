const order = {
  id: 'CO817SHV8289',
  number: 'CO817SHV8289',
  delivered: {
    from: 'NCM Wireless Prime Trans, Miami, FL',
    to: 'Conextion Captains, Dubai, UAE',
  },
  tracking: {
    id: '12398712376592',
    company: 'FedEx'
  },
  items: 78,
  boxes: 3
};

export default {
  getOrder: (id) => {
    return new Promise((resolve, reject) =>{
      setTimeout(() => {
        resolve(order)
      }, 1600);
    });
  }
}
