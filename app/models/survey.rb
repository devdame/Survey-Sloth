class Survey < ActiveRecord::Base
  belongs_to :user
  has_many :questions
  has_many :completion_users
  has_many :survey_takers, through: :completion_users, class_name: "User"
end
