class Survey < ActiveRecord::Base
  belongs_to :user
  has_many :questions
  has_many :responses, through: :questions
  has_many :participant_responses, through: :responses
  has_many :participants, through: :participant_responses

  validates :title, presence: true
end
