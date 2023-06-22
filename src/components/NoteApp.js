import React, { useState } from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import './NoteApp.css';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteIdToEdit, setNoteIdToEdit] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNoteIdToEdit(null);
    setTitle('');
    setBody('');
  };

  const openReadModal = (note) => {
    setSelectedNote(note);
    setIsReadModalOpen(true);
  };

  const closeReadModal = () => {
    setIsReadModalOpen(false);
  };

  const addNote = () => {
    if (title !== '' && body !== '') {
      const newNote = {
        id: noteIdToEdit || Date.now(),
        title: title,
        body: body,
        modified: new Date().toISOString(),
      };

      if (noteIdToEdit) {
        const updatedNotes = notes.map((note) =>
          note.id === noteIdToEdit ? newNote : note
        );
        setNotes(updatedNotes);
      } else {
        setNotes([...notes, newNote]);
      }

      setTitle('');
      setBody('');
      closeModal();
    }
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const editNote = (id) => {
    const editedNote = notes.find((note) => note.id === id);
    setNoteIdToEdit(id);
    setTitle(editedNote.title);
    setBody(editedNote.body);
    setIsModalOpen(true);
  };

  const searchNotes = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterNotes = (event) => {
    setFilterBy(event.target.value);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filterBy === 'name') {
    filteredNotes.sort((a, b) => a.title.localeCompare(b.title));
  } else if (filterBy === 'date-created') {
    filteredNotes.sort((a, b) => moment(a.created).diff(b.created));
  } else if (filterBy === 'date-modified') {
    filteredNotes.sort((a, b) => moment(b.modified).diff(a.modified));
  }
  return (
    <div className="note-app">
      <nav className="navbar">
        <h2>Note Taking</h2>
      </nav>
      <br />
      <div className="search-sort-container">
      <div className="search-container">
        <input type="text" placeholder="Search" onChange={searchNotes} />
      </div>
      <div className="filter-container">
        <i className="fas fa-filter"></i>
        <select value={filterBy} onChange={filterNotes}>
          <option value="">None</option>
          <option value="name">Title</option>
          <option value="date-created">Date Created</option>
          <option value="date-modified">Date Modified</option>
        </select>
      </div>
      </div>


      <button className="add-note-button" onClick={openModal}>
        <i className="fas fa-plus"></i> Add Note
      </button>

      <ul className="note-list">
        {filteredNotes.map((note) => (
          <li key={note.id} className="note-item">
            <div className="note-content">
              <strong>{(note.title).slice(0, 8)}{note.title.length > 8 && "..."}</strong>
              <p className="note-body">{(note.body).slice(0, 15)}{note.body.length > 15 && "..."}</p>
              <p className="note-date">
                {moment(note.modified).format('MMMM Do YYYY, h:mm:ss a')}
              </p>
            </div>
            <div className="note-buttons">
              <button className="edit-button" onClick={() => editNote(note.id)}>
                <i className="fas fa-edit"></i>
              </button>
              <button
                className="delete-button"
                onClick={() => deleteNote(note.id)}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
              <button className="read-button" onClick={() => openReadModal(note)}>
                <i class="fas fa-book-reader"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal"
      >
        <h3>{noteIdToEdit ? 'Edit Note' : 'Add Note'}</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        ></textarea>
        <button onClick={addNote}>
          {noteIdToEdit ? 'Save Changes' : 'Add Note'}
        </button>
      </Modal>

      <Modal
        isOpen={isReadModalOpen}
        onRequestClose={closeReadModal}
        className="read-modal"
      >
        <h3>{selectedNote?.title}</h3>
        <p>{selectedNote?.body}</p>
      </Modal>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Note Making App. All rights reserved.</p>
        <p>Developed By Kulbhushan</p>
      </footer>
    </div>
  );
};

export default NoteApp;
