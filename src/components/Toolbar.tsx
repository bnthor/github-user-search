
import { useRef, useEffect } from 'react';
import { debounce } from '../helpers/debounce';

import styles from './Toolbar.module.css'; 
import copyIcon from '../Icons/copy.svg';
import deleteIcon from '../Icons/delete.svg';

function Toolbar(props:{
    editMode: boolean,
    setResults: Function,
    selectedUsers: Object[],
    setSelectedUsers: Function,
    toggleAllUsers: Function,
    getTotalNumberOfResults: Function,
    duplicateUsers: Function,
    deleteUsers: Function
}) {
    const selectionRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const checkbox = selectionRef?.current;

        if (checkbox == null) {
            return;
        }

        if (props.selectedUsers.length === 0) {
            checkbox.checked = false;
            checkbox.indeterminate = false;
        } else if (props.selectedUsers.length === props.getTotalNumberOfResults()) {
            checkbox.checked = true;
            checkbox.indeterminate = false;
        } else {
            // Checkboxes easter egg: there's a way to make it "partially checked" [-]
            // By setting its indeterminate property to true in JS (only works in JS)
            checkbox.indeterminate = true;
        }
    });

    const handleSelection = (event:React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        props.toggleAllUsers(isChecked);
    }
    
    const handleChange = debounce(async (event:React.ChangeEvent<HTMLInputElement>) => {
        // Reset selected users
        props.setSelectedUsers([]);

        try {
            const response = await fetch(`https://api.github.com/search/users?q=${event.target.value}`);

            if (!response.ok && response.status === 403) {
              throw new Error('API rate limit exceeded');
            }

            const users = await response.json();
            props.setResults(users.items);
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <div className={styles.toolbar}>
            <div className={styles.toolbar__container}>
                <div className={styles.toolbar__selection}>
                    {props.editMode === true &&
                        <>
                            <input type="checkbox" id="selection" ref={selectionRef} onChange={handleSelection} />
                            <label htmlFor="selection">{props.selectedUsers.length} elements selected</label>
                        </>
                    }
                </div>
                <div className={styles.toolbar__search}>
                    <input 
                        type="text" 
                        placeholder="Search users by name" 
                        className={styles.toolbar__searchInput}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.toolbar__actions}>
                    {props.editMode === true &&
                        <>
                            <button title="Duplicate selection" onClick={() => props.duplicateUsers()} disabled={!props.selectedUsers.length}>
                                <img src={copyIcon} alt="" />
                            </button>
                            <button title="Delete selection" onClick={() => props.deleteUsers()} disabled={!props.selectedUsers.length}>
                                <img src={deleteIcon} alt="" />
                            </button>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Toolbar;
