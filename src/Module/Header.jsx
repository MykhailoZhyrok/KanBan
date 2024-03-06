import React, { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { getIssue } from '../features/issue/issueSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
export const Header = (props) => {
  const [repoUrl, setRepoUrl] = useState('');
  const dispatch = useDispatch()

  const params = useParams();
  const owner = params.name;
  const repoName = params.repos;
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = localStorage.getItem(`${owner}/${repoName}`);
    if (storedTasks&&JSON.parse(storedTasks).length) {
      props.setTasks(JSON.parse(storedTasks));
    } else {
      dispatch(getIssue({ owner, repo: repoName }))
  .then((response) => {
    props.setTasks(response.payload);
    
  })
  .catch((error) => {
    console.error('Помилка отримання даних:', error);
  });
      }
      
    }, [dispatch, owner, repoName]);



  const handleLoadIssues = async() => {
    const urlParts = repoUrl.split('/');
    if (urlParts.length >= 2&&repoUrl.startsWith('https://github.com')) {
      const owner = urlParts[urlParts.length - 2];
      const repo = urlParts[urlParts.length - 1];
      dispatch(getIssue({ owner, repo })).then((response)=>{
        if(response.payload){
          navigate(`/${owner}/${repo}`);
          setRepoUrl('');
        }else{
          alert("Undefind Value!!!")
        }
      })
    } else {
      alert('Невірний формат URL-адреси');
     
    }
  };

  return (
    <div data-testid="repo-page">
      <div className="input-group mb-3 mt-3">
        <input type="text"
          placeholder="Enter repository URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)} className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2"/>
          <button className="btn btn-outline-secondary" onClick={handleLoadIssues} type="button" id="button-addon2">Button</button>
      </div>
      {owner ? (
        <div className="d-flex flex-wrap align-items-center text-normal">
          <span className="mr-1">
            <Link className="text-decoration-none fs-5" to={`/user/${owner}`}>
              {owner}
            </Link>
          </span>
          <span className="mx-1 color-fg-muted">/</span>
          <strong>
            <a
              className="text-decoration-none fs-5"
              href=""
              onClick={(e) => {
                e.preventDefault();
                dispatch(getIssue({ owner, repo: repoName }));
              }}
            >
              {repoName}
            </a>
          </strong>
        </div>
      ) : null}
    </div>
  );
};



