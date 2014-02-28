class User < ActiveRecord::Base
  has_many :authored_surveys, class_name: "Survey"
          # renamed survey to authored_survey to avoid naming conflicts. Spcifying
          # class Survey
  has_many :response_users # join table
  has_many :responses, through: :response_users
  has_many :completion_users
  has_many :completed_surveys, through: :completion_users, class_name: "Survey"
end
