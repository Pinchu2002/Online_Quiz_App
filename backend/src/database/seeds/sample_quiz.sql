-- Sample Quiz Data

-- Insert a quiz
INSERT INTO quizzes (id, title, description, time_limit) VALUES (1, 'JavaScript Basics', 'Test your fundamental JavaScript knowledge.', 600);

-- Insert questions for the quiz
INSERT INTO questions (id, quiz_id, text, correct_option_id, points, order_index) VALUES
(1, 1, 'What does "DOM" stand for?', 1, 10, 0),
(2, 1, 'Which of the following can be used to declare a variable in JavaScript?', 8, 10, 1),
(3, 1, 'What is the correct way to write a single-line comment in JavaScript?', 11, 10, 2),
(4, 1, 'Which function is used to print content to the browser console?', 14, 10, 3),
(5, 1, 'What does "NaN" stand for in JavaScript?', 17, 10, 4);

-- Insert options for question 1
INSERT INTO options (id, question_id, text, order_index) VALUES
(1, 1, 'Document Object Model', 0),
(2, 1, 'Data Object Model', 1),
(3, 1, 'Document Oriented Middleware', 2),
(4, 1, 'Dynamic Object Management', 3);

-- Insert options for question 2
INSERT INTO options (id, question_id, text, order_index) VALUES
(5, 2, 'var', 0),
(6, 2, 'let', 1),
(7, 2, 'const', 2),
(8, 2, 'All of the above', 3);

-- Insert options for question 3
INSERT INTO options (id, question_id, text, order_index) VALUES
(9, 3, '<!-- This is a comment -->', 0),
(10, 3, '/* This is a comment */', 1),
(11, 3, '// This is a comment', 2),
(12, 3, '# This is a comment', 3);

-- Insert options for question 4
INSERT INTO options (id, question_id, text, order_index) VALUES
(13, 4, 'print()', 0),
(14, 4, 'console.log()', 1),
(15, 4, 'log()', 2),
(16, 4, 'display()', 3);

-- Insert options for question 5
INSERT INTO options (id, question_id, text, order_index) VALUES
(17, 5, 'Not a Number', 0),
(18, 5, 'No Available Number', 1),
(19, 5, 'New Abstract Naming', 2),
(20, 5, 'Not a Null', 3);