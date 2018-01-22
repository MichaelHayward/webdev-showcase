require('./gulp/tasks/styles');
require('./gulp/tasks/watch');
require('./gulp/tasks/scripts');
require('./gulp/tasks/modernizr');
require('./gulp/tasks/build');

/* Suspect that reload issues are to do with sprites task happening AFTER gulp watch */

/* Sprites task not (yet) relevant */