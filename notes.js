const fs = require('fs')
const chalk = require('chalk');

const getNotes = function () {
    return 'Your notes...'
}

const addNote = function(title, body){
    const notes = loadNotes()

    const duplicateNotes = notes.filter(function(note){
        return note.title === title
    })

    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)    
        console.log('New note added!')
    }else{
        console.log('Note title already taken!')
    }

}

const removeNote = function(title){
    const notes = loadNotes()

    const notesToKeep = notes.filter(function(note){
        return note.title !== title
    })

    saveNotes(notesToKeep)

    if(notes.length > notesToKeep.length){
        console.log(chalk.bgGreen.bold('Note named ' + title + ' was removed!'))
    }else{
        console.log(chalk.bgRed.bold('Note not found!'))
    }
}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}

const saveNotes = function(notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}