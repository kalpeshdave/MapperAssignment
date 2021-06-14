class CreateMappings < ActiveRecord::Migration[6.1]
  def change
    create_table :mappings do |t|
      t.string :name

      t.timestamps
    end
  end
end
