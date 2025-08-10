function calcPrice(items) {
  let t = 0;
  for (let i = 0; i < items.length; i++) {
    t += items[i].p * items[i].q;
  }
  return t;
}

function calcPrice(items) {
  return items.reduce((total, item) => total + item.p * item.q, 0);
}
