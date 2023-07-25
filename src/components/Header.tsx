import styles from './Header.module.css'; 

function Header(props: {
  editMode: boolean,
  setEditMode: Function
}) {

  const handleEditModeChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    props.setEditMode(isChecked);
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <h1 className={styles.header__title}>Github search</h1>
        <div className={styles.header__checkbox}>
          <label htmlFor="editMode">Edit</label>
          <input type="checkbox" id="editMode" data-testid="editModeCheckbox" checked={props.editMode === true } onChange={handleEditModeChange} />
        </div>
      </div>
    </header>
  );
}

export default Header;
