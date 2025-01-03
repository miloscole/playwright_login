class TestHelpersController < ApplicationController
  allow_unauthenticated_access

  def dashboard_selectors
    formatted_selectors "dashboard/index"
  end

  def login_selectors
    formatted_selectors "sessions/new"
  end

  private

  def formatted_selectors(template)
    html_content = render_to_string(template: template)

    selectors = html_content.scan(/data-test="(.*?)"/).flatten

    formatted_selectors = selectors.each_with_object({}) do |selector, hash|
      hash[selector] = "[data-test='#{selector}']"
    end

    render json: formatted_selectors
  end
end
