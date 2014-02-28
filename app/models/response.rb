class Response < ActiveRecord::Base
  belongs_to :question
  has_many :response_users
  has_many :users, through: :response_users
end
