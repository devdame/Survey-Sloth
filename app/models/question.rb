class Question < ActiveRecord::Base
  belongs_to :survey
  has_many :responses
end





SELECT users.b.name FROM users.a 
JOIN surveys ON users.id = user_id
JOIN completed_surveys ON surveys.id = survey_id
JOIN users.b ON completed_surveys.user_id = users.b.id
WHERE users.a.name = "Lauren"


@survey
@current_user

@current_user.surveys_taken


has_many :user_responses
has_many :responses, through: :user_responses
has_many :questions, through: :responses
has_many :surveys_taken, through: :questions, class_name: "Survey"
has_many :authored_surveys, class_name: "Survey"







user has many surveys_taken through user_responses through responses through surveys  (class: surveys)