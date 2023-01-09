const generarToken = (id) => {
  const number = Math.random().toString(32).slice(2);
  const fecha = Date.now().toString(32);

  return fecha + number;
};

export default generarToken;
