import styles from './UserCard.module.css'; 

function UserCard(props: {
    editMode: boolean,
    id: number,
    login: string,
    avatarUrl: string,
    profileUrl: string,
    toggleUser: Function,
    selectedUsers: number[]
}) {
    
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        props.toggleUser(event.target.checked, props.id);
    };

    return (
        <div className={styles.userCard}>
            {props.editMode === true &&
                <>
                    <input 
                        type="checkbox" 
                        data-testid="userCheckbox"
                        className={styles.userCard__checkbox} 
                        onChange={handleChange}
                        checked={props.selectedUsers.includes(props.id)}
                    />
                </>
            }
            <figure className={styles.userCard__figure}>
                <img src={props.avatarUrl} alt="" className={styles.userCard__img} width="56" height="56" />
            </figure>
            <p>{props.id}</p>
            <p>{props.login}</p>
            <a className={styles.userCard__link} href={props.profileUrl} target="_blank" rel="noreferrer">
                View profile
            </a>
        </div>
    );
}

export default UserCard;
