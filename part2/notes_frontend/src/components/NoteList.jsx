import propTypes from 'prop-types';
import Note from './Note';


const NotesList = ({ notes, toggleImportance }) => (
  <div className="max-w-md mx-auto mt-6">
    <h2 className="text-xl text-center font-bold text-gray-800 mb-4">Your Notes</h2>
    <ul className="space-y-4">
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          toggleImportance={() => toggleImportance(note.id)}
        />
      ))}
    </ul>
  </div>
);

NotesList.propTypes = {
  notes: propTypes.arrayOf(propTypes.object).isRequired,
  toggleImportance: propTypes.func.isRequired,
};

export default NotesList;