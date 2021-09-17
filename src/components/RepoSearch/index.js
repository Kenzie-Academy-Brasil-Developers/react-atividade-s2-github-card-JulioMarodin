import { useState } from 'react';
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
    <div>
      <form>
        <input type="text" onChange={handleChange} />
        <button onClick={handleClick}>Procurar</button>
        {show && (
          <div>
            <img src={data?.owner?.avatar_url} alt="" />
            <div>{data.full_name}</div>
            <div>{data.description}</div>
          </div>
        )}
      </form>
    </div>
  );
};

export default RepoSearch;
