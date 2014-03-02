class Question < ActiveRecord::Base
  belongs_to :survey
  has_many :responses

  validates :text, presence: true
  validates :survey_id, presence: true
end
