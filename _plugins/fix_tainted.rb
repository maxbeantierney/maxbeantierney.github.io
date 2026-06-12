module TaintedFix
  def tainted?
    false
  end
end
Object.include(TaintedFix)