module Flashable
  extend ActiveSupport::Concern

    def notice(options = {})
      return flash["notice"] = options[:custom] unless options[:custom].nil?
      return flash["notice"] = "Action succeeded!" if options[:basic]

      action = action_name == "destroy" ? "delete" : action_name
      resource = (options[:for] || controller_name.singularize).capitalize

      flash["notice"] = "#{resource} #{options[:with]} was successfully #{action}d!"
    end

    def alert(custom = nil)
      flash["alert"] = custom || "Something went wrong, please try again"
    end
end
