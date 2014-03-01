#User.create(user_name: "steve_face", first_name: "Steve", last_name: "Face", email: "steve@face.com", password: "123456")
Survey.create(title: "Sloth Survey 1", user_id: 1)

Question.create(text: "Which color do you prefer?", survey_id: 1)
	Response.create(text: "red", question_id: 1)
	Response.create(text: "blue", question_id: 1)
	Response.create(text: "yellow", question_id: 1)
	Response.create(text: "green", question_id: 1)

Question.create(text: "Which fruit do you prefer??", survey_id: 1)
	Response.create(text: "apple", question_id: 2)
	Response.create(text: "banana", question_id: 2)
	Response.create(text: "grapes", question_id: 2)
	Response.create(text: "pears", question_id: 2)

Question.create(text: "How many meals do you eat daily??", survey_id: 1)
	Response.create(text: "2", question_id: 3)
	Response.create(text: "3", question_id: 3)
	Response.create(text: "4", question_id: 3)
	Response.create(text: "5", question_id: 3)

Question.create(text: "Where would you prefer to vacation?", survey_id: 4)
	Response.create(text: "Somewhere tropical", question_id: 4)
	Response.create(text: "Europe", question_id: 4)
	Response.create(text: "Woods/Camping", question_id: 4)
	Response.create(text: "Big City", question_id: 4)

Question.create(text: "Which Avenger are you?", survey_id: 5)
	Response.create(text: "Iron Man/Tony Stark", question_id: 5)
	Response.create(text: "Captain America/Steve Rogers", question_id: 5)
	Response.create(text: "The Hulk/Bruce Banner", question_id: 5)
	Response.create(text: "Black Widow/Natasha Romanov", question_id: 5)

