import React, {useState, useEffect} from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { VerticalGap } from '../../../components/common/typography';
import { TilesWrapper } from './styles';
import { getOverview } from '../../../apis/auth';
import { toast } from 'react-toastify';


const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
      return (
          <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
              <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
          </div>
      );
  }

  return null;
};


const Dashboard = (props: any) => {

const COLORS = ['#00C6FF', '#0088CC', '#4A154B'];

  const pieData = [
    {
      "name": "Messenger",
      "value": 68.85
    },
    {
      "name": "Telegram",
      "value": 7.91
    },
    {
      "name": "Slack",
      "value": 6.85
    },
  ];
  
  const [data, setData] = useState(null);

  useEffect(() => {
    getOverview().then((response) => { 
      setData(response.data[0]);
      console.log(response.data[0]);
    }).catch((err) => {
      toast.error("Something went wrong");
    })
  }, []);
  return (
    <React.Fragment>
      <div className="page-header">
        <h1 className="main-heading">Dashboard</h1>
      </div>
      <VerticalGap size="7" />
      {/* <PieChart width={800} height={400}>
        <Pie
          data={data} 
          cx={120} 
          cy={200} 
          innerRadius={60}
          outerRadius={80} 
          fill="#8884d8"
          paddingAngle={5}
        >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          } */}
        {/* </Pie>
      </PieChart> */}
      <TilesWrapper>
      {data &&  <> <PieChart width={400} height={300}>
            <Pie data={data.doughnut} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" >
              {
                  data.doughnut.map((entry, index) => <Cell key={`cell-${index}`} fill={data.colors[index % data.colors.length]} />)
              }
            </Pie>
          {/* <Tooltip content={<CustomTooltip active={active} payload={payload} label={label} />} /> */}
            <Legend />
        </PieChart>
          
          <div className="tile">
          <div>
            <p>Total Bots</p>
            <h3>{data.total}</h3>
          </div>
         
          </div>
          <div className="tile">
          <div>
            <p>Active Connections</p>
            <h3>{data.active}</h3>
          </div>
          </div>
          <div className="tile">
          <div>
            <p>Inactive Connections</p>
            <h3>{data.inactive}</h3>
          </div>
          </div></>}
      </TilesWrapper>
    </React.Fragment>
 
  );
};

export default Dashboard;
