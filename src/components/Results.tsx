import styles from './Results.module.css'; 

import UserCard from './UserCard';

function Results(props: {
    editMode: boolean,
    results: Object[]
    toggleUser: Function,
    selectedUsers: number[],
}) {
  return (
    <div className={styles.results}>
        { props.results.length > 0 
            ? <div className={styles.results__container}>
              {props.results.map((user:any) => {
                return <UserCard 
                  editMode={props.editMode}
                  id={user.id} 
                  login={user.login} 
                  avatarUrl={user.avatar_url} 
                  profileUrl={user.html_url} 
                  key={user.id} 
                  toggleUser={props.toggleUser}
                  selectedUsers={props.selectedUsers}
                />
              })}
            </div>
            : <div className={styles.results__empty}>No results</div>
        }
    </div>
  );
}

export default Results;
