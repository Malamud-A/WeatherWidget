import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'

const NotesModal = ({notes, handleDelete}) => (
    <React.Fragment>
      <div className="notes-modal__notes-list">
        {notes.map(note => (
            <div key={`note-${note.id}`} className="notes-modal__note">
              {note.note}
              <FontAwesomeIcon
                  onClick={handleDelete}
                  data-id={note.id}
                  icon={faTimesCircle}
                  className="note-delete-btn"
              />
            </div>
        ))}
      </div>
      {!notes.length &&
      <span className="notes-modal__no-notes-message">
              There is currently no notes for this date
          </span>
      }
    </React.Fragment>
);

export default NotesModal;