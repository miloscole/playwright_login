class Article < ApplicationRecord
  validates :title, presence: true, length: 3..100
  validates :content, presence: true, length: 10..4000
end
