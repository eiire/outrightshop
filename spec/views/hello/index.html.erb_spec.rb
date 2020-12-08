require 'rails_helper'

RSpec.describe 'yo/yo.html.erb', type: :view do
  it 'renders "Hello World"' do
    render
    expect(rendered).to match(/YO/)
  end
end
