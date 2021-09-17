import { useState } from 'react';
import { Container } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import './styles.css';

const RepoSearch = () => {
  const [userInput, setUserInput] = useState('');
  const [data, setData] = useState();
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetch(`https://api.github.com/repos/${userInput}`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .then(() => setShow(true));

    console.log(data);
  };

  return (
    // <div>
    //   <form>
    //     <input type="text" onChange={handleChange} />
    //     <button onClick={handleClick}>Procurar</button>
    //     {show && (
    //       <div>
    //         <img src={data?.owner?.avatar_url} alt="" />
    //         <div>{data.full_name}</div>
    //         <div>{data.description}</div>
    //       </div>
    //     )}
    //   </form>
    // </div>
    <Container>
      <form>
        <TextField label="Digite o nome do usuário" onChange={handleChange} />
        <button variant="contained" onClick={handleClick}>
          Mostrar
        </button>
      </form>
      {show && (
        <Card sx={{ maxWidth: 35 }}>
          <CardContent>
            <CardMedia
              component="img"
              height="30"
              width="30"
              image={data?.owner?.avatar_url}
              alt=""
            />
            <Typography variant="h4">{data.full_name}</Typography>
            <Typography>{data.description}</Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default RepoSearch;
