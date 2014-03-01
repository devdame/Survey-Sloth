class CreateCompletedSurveys < ActiveRecord::Migration
  def change
    create_table :completed_surveys do |t|
      t.belongs_to :user_id
      t.belongs_to :survey_id

      t.timestamps
    end
  end
end
