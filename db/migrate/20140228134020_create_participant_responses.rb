class CreateParticipantResponses < ActiveRecord::Migration
  def change
    create_table :participant_responses do |t|
      t.belongs_to :user
      t.belongs_to :question
      t.belongs_to :response
      t.timestamps
    end
  end
end
