class User < ActiveRecord::Base
  has_many :authored_surveys, class_name: "Survey"
          # renamed survey to authored_survey to avoid naming conflicts. Spcifying
          # class Survey
  has_many :user_responses # join table
  has_many :responses, through: :user_responses
  has_many :completed_surveys, through: :completion_users, source: :survey
          # if it has join table in the middle, specify source: specified in completion_user.rb

end


