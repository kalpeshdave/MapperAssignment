class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.string :title, null: false
      t.string :type, default: "RatingScale", null: false
      t.integer :frequency, default: 60, null: false
      t.integer :appears_on_day, null: false
      t.string :teaming_stage, default: "All", null: false
      t.references :role, null: false, foreign_key: true
      t.references :mapping, null: false, foreign_key: true
      t.string :conditions, default: "Always", null: false
      t.boolean :is_required, default: true, null: false

      t.timestamps default: -> { 'CURRENT_TIMESTAMP' }
    end
  end
end
