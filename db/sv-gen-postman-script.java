package generator;

import java.io.File;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.satcomgroup.framework.util.FileUtil;
import com.satcomgroup.util.basic.StringUtil;

import bean.ArtifactBean;
import bean.FieldBean;
import bean.TableBean;
import util.GenConstants;

public class GenPostman extends GenBase {
  private String m_template;
  private Map<String, String> m_bodyValyeMap = new LinkedHashMap<String, String>();

  public GenPostman(String _configFn) throws Exception {
    super(_configFn);
    m_template = getConfig().getProp("postman.template.path");
    m_bodyValyeMap.put("int", "-1");
    m_bodyValyeMap.put("varchar", "\\\"--String--\\\"");
    m_bodyValyeMap.put("float", "0.00");
    m_bodyValyeMap.put("datetime", "\\\"2023-01-01\\\"");
  }

  private String getApiBody(TableBean _table) {
    clearBuffer();
    boolean first = true;
    String fieldName = "";
    append("\"{\\r\\n");
    for (FieldBean fb : _table.getFields()) {
      if (!isSpecialField(fb.getName())) {
        fieldName = fb.getName().toLowerCase();
        if (!fb.isPrimaryKey()) {
          if (first) {
            first = false;
            append(StringUtil.SP(2));
          } else {
            append(" ,");
          }
          append("\\\"" + fieldName + "\\\"" + ": " + m_bodyValyeMap.get(fb.getType().toLowerCase()) + "\\r\\n");
        }
      }
    }
    append("}\\r\\n\"");
    return m_buf.toString();
  }
  
  private void getRequest(String _objName, String _method) {
    appendLn(StringUtil.SP(6) + dbQuote("name") + ":" + dbQuote(_objName) + ",");
    appendLn(StringUtil.SP(6) + dbQuote("request") + ":" + "{");
    appendLn(StringUtil.SP(8) + dbQuote("method") + ":" + dbQuote(_method) + ",");
    appendLn(StringUtil.SP(8) + dbQuote("header") + ":" + "[],");
    appendLn(StringUtil.SP(8) + dbQuote("url") + ":" + "{");
    
  }

  private void genScript(TableBean _table) throws Exception {

    String body = getApiBody(_table);
    System.out.println(body);

    clearBuffer();
    String script = loadFile(m_template + GenConstants.K_POSTMAN_SCRIPT_TEMPLATE);
    String objName = _table.getName().toLowerCase();
    String apiName = objName + GenConstants.K_DOT_PHP;
    String single = objName.endsWith("s") ? objName.substring(0, objName.length() - 1) : objName;

    // Gen get all
    appendLn(StringUtil.SP(4) + "{");
    appendLn(StringUtil.SP(6) + dbQuote("name") + ":" + dbQuote(objName) + ",");
    appendLn(StringUtil.SP(6) + dbQuote("request") + ":" + "{");
    appendLn(StringUtil.SP(8) + dbQuote("method") + ":" + dbQuote("GET") + ",");
    appendLn(StringUtil.SP(8) + dbQuote("header") + ":" + "[],");
    appendLn(StringUtil.SP(8) + dbQuote("url") + ":" + "{");
    appendLn(StringUtil.SP(10) + dbQuote("raw") + ":" + dbQuote("{{dev_url}}/" + apiName) + ",");
    appendLn(StringUtil.SP(10) + dbQuote("host") + ": [");
    appendLn(StringUtil.SP(12) + dbQuote("{{dev_url}}"));
    appendLn(StringUtil.SP(10) + "],");
    appendLn(StringUtil.SP(10) + dbQuote("path") + ": [");
    appendLn(StringUtil.SP(12) + dbQuote(apiName));
    appendLn(StringUtil.SP(10) + "]");
    appendLn(StringUtil.SP(8) + "}");
    appendLn(StringUtil.SP(6) + "},");
    appendLn(StringUtil.SP(6) + dbQuote("response") + ": []");
    appendLn(StringUtil.SP(4) + "},");

    // Gen get by id
    appendLn(StringUtil.SP(4) + "{");
    appendLn(StringUtil.SP(6) + dbQuote("name") + ":" + dbQuote(single + " by id") + ",");
    appendLn(StringUtil.SP(6) + dbQuote("request") + ":" + "{");
    appendLn(StringUtil.SP(8) + dbQuote("method") + ":" + dbQuote("GET") + ",");
    appendLn(StringUtil.SP(8) + dbQuote("header") + ":" + "[],");
    appendLn(StringUtil.SP(8) + dbQuote("url") + ":" + "{");
    appendLn(StringUtil.SP(10) + dbQuote("raw") + ":" + dbQuote("{{dev_url}}/" + apiName + "/1") + ",");
    appendLn(StringUtil.SP(10) + dbQuote("host") + ": [");
    appendLn(StringUtil.SP(12) + dbQuote("{{dev_url}}"));
    appendLn(StringUtil.SP(10) + "],");
    appendLn(StringUtil.SP(10) + dbQuote("path") + ": [");
    appendLn(StringUtil.SP(12) + dbQuote(apiName) + ",");
    appendLn(StringUtil.SP(12) + "1");
    appendLn(StringUtil.SP(10) + "]");
    appendLn(StringUtil.SP(8) + "}");
    appendLn(StringUtil.SP(6) + "},");
    appendLn(StringUtil.SP(6) + dbQuote("response") + ": []");
    appendLn(StringUtil.SP(4) + "},");

    // Gen POST
    appendLn(StringUtil.SP(4) + "{");
    appendLn(StringUtil.SP(6) + dbQuote("name") + ":" + dbQuote(objName) + ",");
    appendLn(StringUtil.SP(6) + dbQuote("request") + ":" + "{");
    appendLn(StringUtil.SP(8) + dbQuote("method") + ":" + dbQuote("POST") + ",");
    appendLn(StringUtil.SP(8) + dbQuote("header") + ":" + "[],");
    appendLn(StringUtil.SP(8) + dbQuote("body") + ":" + "{");
    appendLn(StringUtil.SP(10) + dbQuote("mode") + ":" + dbQuote("raw") + ",");
    appendLn(StringUtil.SP(10) + dbQuote("raw") + ":" + body + ",");
    appendLn(StringUtil.SP(10) + dbQuote("options") + ": {");
    appendLn(StringUtil.SP(12) + dbQuote("raw") + ": {");
    appendLn(StringUtil.SP(14) + dbQuote("language") + ": " + dbQuote("json"));
    appendLn(StringUtil.SP(12) + "}");
    appendLn(StringUtil.SP(10) + "}");
    appendLn(StringUtil.SP(8) + "},");
    appendLn(StringUtil.SP(8) + dbQuote("url") + ":" + "{");
    appendLn(StringUtil.SP(10) + dbQuote("raw") + ":" + dbQuote("{{dev_url}}/" + apiName) + ",");
    appendLn(StringUtil.SP(10) + dbQuote("host") + ": [");
    appendLn(StringUtil.SP(12) + dbQuote("{{dev_url}}"));
    appendLn(StringUtil.SP(10) + "],");
    appendLn(StringUtil.SP(10) + dbQuote("path") + ": [");
    appendLn(StringUtil.SP(12) + dbQuote(apiName));
    appendLn(StringUtil.SP(10) + "]");
    appendLn(StringUtil.SP(8) + "}");
    appendLn(StringUtil.SP(6) + "},");
    appendLn(StringUtil.SP(6) + dbQuote("response") + ": []");
    appendLn(StringUtil.SP(4) + "},");

    // Gen PUT
    appendLn(StringUtil.SP(4) + "{");
    appendLn(StringUtil.SP(6) + dbQuote("name") + ":" + dbQuote(objName) + ",");
    appendLn(StringUtil.SP(6) + dbQuote("request") + ":" + "{");
    appendLn(StringUtil.SP(8) + dbQuote("method") + ":" + dbQuote("PUT") + ",");
    appendLn(StringUtil.SP(8) + dbQuote("header") + ":" + "[],");
    appendLn(StringUtil.SP(8) + dbQuote("body") + ":" + "{");
    appendLn(StringUtil.SP(10) + dbQuote("mode") + ":" + dbQuote("raw") + ",");
    appendLn(StringUtil.SP(10) + dbQuote("raw") + ":" + body + ",");
    appendLn(StringUtil.SP(10) + dbQuote("options") + ": {");
    appendLn(StringUtil.SP(12) + dbQuote("raw") + ": {");
    appendLn(StringUtil.SP(14) + dbQuote("language") + ": " + dbQuote("json"));
    appendLn(StringUtil.SP(12) + "}");
    appendLn(StringUtil.SP(10) + "}");
    appendLn(StringUtil.SP(8) + "},");
    appendLn(StringUtil.SP(8) + dbQuote("url") + ":" + "{");
    appendLn(StringUtil.SP(10) + dbQuote("raw") + ":" + dbQuote("{{dev_url}}/" + apiName) + ",");
    appendLn(StringUtil.SP(10) + dbQuote("host") + ": [");
    appendLn(StringUtil.SP(12) + dbQuote("{{dev_url}}"));
    appendLn(StringUtil.SP(10) + "],");
    appendLn(StringUtil.SP(10) + dbQuote("path") + ": [");
    appendLn(StringUtil.SP(12) + dbQuote(apiName));
    appendLn(StringUtil.SP(10) + "]");
    appendLn(StringUtil.SP(8) + "}");
    appendLn(StringUtil.SP(6) + "},");
    appendLn(StringUtil.SP(6) + dbQuote("response") + ": []");
    appendLn(StringUtil.SP(4) + "},");

    // Gen DELETE
    appendLn(StringUtil.SP(4) + "{");
    appendLn(StringUtil.SP(6) + dbQuote("name") + ":" + dbQuote(objName) + ",");
    appendLn(StringUtil.SP(6) + dbQuote("request") + ":" + "{");
    appendLn(StringUtil.SP(8) + dbQuote("method") + ":" + dbQuote("DELETE") + ",");
    appendLn(StringUtil.SP(8) + dbQuote("header") + ":" + "[],");
    appendLn(StringUtil.SP(8) + dbQuote("url") + ":" + "{");
    appendLn(StringUtil.SP(10) + dbQuote("raw") + ":" + dbQuote("{{dev_url}}/" + apiName + "/1") + ",");
    appendLn(StringUtil.SP(10) + dbQuote("host") + ": [");
    appendLn(StringUtil.SP(12) + dbQuote("{{dev_url}}"));
    appendLn(StringUtil.SP(10) + "],");
    appendLn(StringUtil.SP(10) + dbQuote("path") + ": [");
    appendLn(StringUtil.SP(12) + dbQuote(apiName) + ",");
    appendLn(StringUtil.SP(12) + "1");
    appendLn(StringUtil.SP(10) + "]");
    appendLn(StringUtil.SP(8) + "}");
    appendLn(StringUtil.SP(6) + "},");
    appendLn(StringUtil.SP(6) + dbQuote("response") + ": []");
    append(StringUtil.SP(4) + "}");

    script = script.replace(GenConstants.K_API_METHODS, m_buf.toString()).replace(GenConstants.K_TABLE_NAME,
        _table.getName());

    String path = getConfig().getProp(GenConstants.K_ROOT_DIR) + File.separator
        + getConfig().getProp(GenConstants.K_POSTMAN_DIR);
    if (!FileUtil.dirExists(path))
      FileUtil.createDir(path);
    String outFn = path + File.separator + _table.getName() + GenConstants.K_DOT_JSON;
    FileUtil.appendFile(outFn, script);
  }

  public List<ArtifactBean> run(TableBean _table) throws Exception {
    genScript(_table);

    return getArtifacts();
  }
}
