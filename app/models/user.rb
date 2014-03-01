
class User < ActiveRecord::Base
	has_secure_password

  has_many :authored_surveys, class_name: "Survey"
          # renamed survey to authored_survey to avoid naming conflicts. Spcifying
          # class Survey
  has_many :participant_responses # join table
  has_many :responses, through: :participant_responses
  has_many :completed_surveys, through: :participant_responses, source: :survey
          # if it has join table in the middle, specify source: specified in completion_user.rb
  validates :user_name, presence: true

end


