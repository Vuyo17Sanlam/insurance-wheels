import Vehicle_Card from '../components/Vehicle_Card';

const Dashboard = () => {
  const vehicles = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      license: 'ABC-1234',
      image: 'https://cdn.imagin.studio/getimage?customer=scs&make=Toyota&modelFamily=Camry&zoomType=fullscreen'
    },
    {
      id: 2,
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      license: 'XYZ-5678',
      image: 'https://cdn.imagin.studio/getimage?customer=scs&make=Honda&modelFamily=Civic&zoomType=fullscreen'
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Vehicle Dashboard</h2>
      <div>
        {vehicles.map((v) => (
          <Vehicle_Card key={v.id} vehicle={v} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
